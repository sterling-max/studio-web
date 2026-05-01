# Download Analytics

Sterling Lab tracks software downloads at the website download gateway, not inside R2. This keeps public links stable while letting the Pages Function record one event before streaming the installer.

## Data Flow

1. User opens `/download/mc-setup.exe`, `/download/mc-latest.exe`, or `/download/mc-free.exe`.
2. `functions/download/[file].ts` resolves the latest Max Commander installer in R2.
3. The function streams the installer and records a non-blocking row in `download_events`.
4. `/api/admin/downloads` returns grouped report data for the admin UI at `/admin/downloads`.
5. `/api/admin/licenses` lists granted licenses, generates manual Max Commander Pro licenses, and supports revoke/restore actions from the same admin UI.

## Database

Apply `db/migration_003_download_analytics.sql` to the same D1 database used for licensing:

```pwsh
npx wrangler d1 execute sterling-db --remote --file .\db\migration_003_download_analytics.sql
```

The analytics table is separate from `licenses` and `activations`. It stores product/version/channel facts plus hashed IP and user-agent values; raw IP addresses are not stored.

## Security

Protect these routes with Cloudflare Access:

- `/admin/*`
- `/admin`
- `/api/admin/*`

Set `ADMIN_EMAILS` to a comma-separated allowlist of operator emails. The API checks the Cloudflare Access authenticated email header and rejects users that are not in the allowlist.

Optional fallback for operational scripts: set `ADMIN_REPORT_TOKEN` and call the API with `Authorization: Bearer <token>`. Prefer Cloudflare Access for browser use.

Recommended environment variables:

- `ADMIN_EMAILS=maximiliano.villarreal@gmail.com`
- `DOWNLOAD_ANALYTICS_SALT=<long random secret>`

## Report Fields

The admin report is grouped by:

- product
- version
- channel
- day
- country

The report also shows recent events for distribution debugging.

## Manual Licenses

The admin page includes a manual license generator. It creates active `mc_pro` keys in the existing `licenses` table, tagged with `order_id = MANUAL_ADMIN` and a `MANUAL-*` transaction id.

The generated key is shown in the browser for copying. It is not emailed automatically.

The license report shows the latest granted keys, active activation count, source order/transaction ids, and status. Revoking a license sets `licenses.status = revoked`, records a reason, and revokes active activations for that key. Restoring sets the license back to `active`; the customer can reactivate normally.
