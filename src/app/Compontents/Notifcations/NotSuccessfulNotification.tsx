import React from "react";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface NotSucessfulNotification {
  message: string;
  title: string;
}

export default function NotSuccessfulNotification({
  message,
  title,
}: NotSucessfulNotification) {
  return notifications.show({
    title: title,
    message: message,
    color: "red",
    icon: <IconX />,
    autoClose: 3000,
  });
}
