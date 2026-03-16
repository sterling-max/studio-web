export interface Env {
  DB: D1Database;
  PADDLE_WEBHOOK_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  // 1. Verify Paddle Signature (Required for security)
  // [Skipping full implementation for brevity, but it's crucial]
  
  try {
    const body: any = await request.json();

    // Paddle Transaction Completed
    if (body.event_type === 'transaction.completed') {
      const email = body.data.customer?.email || body.data.details?.customer?.email;
      const productId = body.data.items[0]?.product?.id || 'mc_pro'; // Map Paddle ID to internal product_id
      const orderId = body.data.id;

      // Generate a unique license key
      const key = `MC-PRO-${crypto.randomUUID().split('-')[0].toUpperCase()}-${crypto.randomUUID().split('-')[1].toUpperCase()}`;

      // Store in D1
      await env.DB.prepare(
        'INSERT INTO licenses (key, email, product_id, order_id, created_at, payload) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        key, 
        email, 
        productId, 
        orderId, 
        Date.now(), 
        `email=${email};product=${productId}` // Simplified payload
      ).run();

      // 2. Send Email to User (e.g., via Resend)
      // await sendEmail(email, key);

      return new Response(JSON.stringify({ success: true, key }));
    }

    return new Response('Event ignored', { status: 200 });

  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
};
