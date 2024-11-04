"use client";
import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { UserSchema } from "@/utils/schema";
import dayjs from "dayjs";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

const BillingPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const { userSubscription } = useContext(UserSubscriptionContext);
  const createSubsription = () => {
    setLoading(true);
    axios.post("/api/create-subscription", {}).then(
      (response) => {
        console.log(response.data);
        onPayment(response.data);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const onPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_API_kEY_ID,
      subscription_id: subId,
      name: "Contentor",
      description: "Monthly subscription",
      handler: async (response: any) => {
        console.log(response);
        if (response) {
          save_subscription(response?.razorpay_payment_id);
        }
      },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const save_subscription = async (paymentId: string) => {
    const result = await db.insert(UserSchema).values({
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: dayjs().format("DD/MM/YYYY"),
    });
    if (result) {
      window.location.reload();
    }
  };

  return (
    <div className="mx-5 py-5">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-2xl font-medium mb-6 text-center">
          Choose Your Plan
        </h2>

        <div className="flex flex-row justify-center gap-6">
          {/* Free Plan */}
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Free Plan</span>
                <span className="text-xl font-bold">$0</span>
              </CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Generate up to 10,000 words</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Basic support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Standard response time</span>
                </div>
                <Link href={"/dashboard"}>
                  <Button
                    className="w-full mt-4 bg-primary text-white"
                    variant="outline"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="w-[400px] border-2 border-black">
            <CardHeader>
              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm w-fit mb-2">
                RECOMMENDED
              </div>
              <CardTitle className="flex items-center justify-between">
                <span>Premium Plan</span>
                <div className="text-right">
                  <span className="text-xl font-bold">$1.99</span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>
              </CardTitle>
              <CardDescription>Unlimited possibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>100,000 words per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Faster response time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-black" />
                  <span>Advanced features</span>
                </div>
                <Button
                  disabled={loading || userSubscription}
                  className="w-full mt-4 bg-primary flex gap-2 items-center hover:bg-gray-800"
                  onClick={() => createSubsription()}
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  {userSubscription ? "Active plan" : "upgrade now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
