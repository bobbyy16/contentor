import Razorpay from "razorpay";

export async function POST(req, res) {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_kEY_ID,
    key_secret: process.env.RAZORPAY_API_KEY_SECRET,
  });
  const result = await instance.subscriptions.create({
    plan_id: process.env.SUBSCRIPTION_PLAN,
    customer_notify: 1,
    quantity: 1,
    total_count: 1,
    addons: [],
    notes: {
      key1: "Note",
    },
  });

  return Response.json(result);
}
