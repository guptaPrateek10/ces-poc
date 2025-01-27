"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

type FetchToastNotifierProps = {
  fetchError: boolean;
};

const FetchToastNotifier = ({ fetchError }: FetchToastNotifierProps) => {
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to fetch products");
    } else {
      toast.success("Products fetched successfully");
    }
  }, [fetchError]);

  return null; // This component only triggers toast notifications
};

export default FetchToastNotifier;
