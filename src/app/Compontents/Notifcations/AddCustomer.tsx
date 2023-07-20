import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import React from "react";

interface SuccessNotification {
  message: string;
  title: string;
}

export default function SuccessfulNotification({
  message,
  title,
}: SuccessNotification) {
  return notifications.show({
    title: title,
    message: message,
    icon: <IconCheck />,
    autoClose: 3000,
  });
}
