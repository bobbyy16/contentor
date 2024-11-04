"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

const UsageTrack = () => {
  const { user } = useUser();

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );
  const [maxWords, setMaxWords] = useState<number>(10000);
  useEffect(() => {
    user && getData();
    user && IsUserSubscribe();
  }, [user]);

  useEffect(() => {
    user && getData();
  }, [updateCreditUsage]);

  const getData = async () => {
    /*@ts-ignore */

    const result: HISTORY = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    getTotalUsage(result);
  };

  const IsUserSubscribe = async () => {
    const result = await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.email, user?.primaryEmailAddress?.emailAddress));

    if (result) {
      setUserSubscription(true);
      setMaxWords(100000);
    }
  };

  const getTotalUsage = (result: HISTORY) => {
    let total: number = 0;
    result.forEach((element: { aiResponse: string | any[] }) => {
      total = total + Number(element.aiResponse?.length);
    });
    setTotalUsage(total);
    console.log(total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">credits</h2>
        <div className=".h-2 bg-[#444151] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: (totalUsage / maxWords) * 100 + "%" }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} credits used
        </h2>
      </div>
      <Button variant={"secondary"} className="w-full my-3 text-primary">
        {userSubscription ? "Active" : "upgrade"}
      </Button>
    </div>
  );
};

export default UsageTrack;
