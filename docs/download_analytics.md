# Download Analytics

Sterling Lab tracks software downloads at the website download gateway, not inside R2. This keeps public links stable while letting the Pages Function record one event before streaming the installer.

## Data Flow

1. User opens `/download/mc-setup.exe`, `/download/mc-latest.exe`, or `/download/mc-free.exe`.
2. `functions/download/[file].ts` resolves the latest Max Commander installer in R2.
3. The function streams the installer and records a non-blocking row in `download_events`.
4. `/api/admin/downloads` returns grouped report data for the admin UI at `/admin/downloads`.

## Database

Apply `db/migration_003_download_analytics.sql` to the same D1 database used for licensing:

```pwsh
npx wrangler d1 execute sterling-db --remote --file .\db\migration_003_download_analytics.sql
```

The analytics table is separate from `licenses` and `activations`. It stores product/version/channel facts plus hashed IP and user-agent values; raw IP addresses are not stored.

## Security

Protect these routes with Cloudflare Access:

- `/admin/*`
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
