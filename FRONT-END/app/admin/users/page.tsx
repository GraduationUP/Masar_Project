"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SuccessAlert } from "@/components/successAlert";

interface NotificationFormData {
  message: string;
  target: "all" | "sellers" | "users";
}

export default function AdminNotifications() {
  const [message, setMessage] = useState<string>("");
  const [target, setTarget] = useState<"all" | "sellers" | "users">("all");
  const [success, setSuccess] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, target }),
      });

      if (response.ok) {
        alert("Notification sent successfully!");
        setMessage("");
        setSuccess(true);
      } else {
        const errorData = await response.json();
        alert(
          `Failed to send notification: ${
            errorData.message || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification. Please try again.");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 px-3">
        ارسال الاشعارات
      </h2>
      <form
        onSubmit={handleSendMessage}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          htmlFor="message"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          الرسالة:
        </label>
        <textarea
          id="message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
        />

        <label
          htmlFor="target"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          المستقبل:
        </label>
        <select
          id="target"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={target}
          onChange={(e) =>
            setTarget(e.target.value as "all" | "sellers" | "users")
          }
        >
          <option value="all">الجميع</option>
          <option value="sellers">البائعون</option>
          <option value="users">المستخدمون</option>
        </select>

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
        >
          ارسل الاشعارات
        </Button>
        <SuccessAlert
          message="تم ارسال الاشعارات بنجاح"
          onClose={() => setSuccess(false)}
          show={success}
        />
      </form>
    </>
  );
}
