import { CustomAlert } from "./customAlert";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AlertTrigger() {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status") === "true";
    const msg = searchParams.get("message");

    if (status && msg) {
      setSuccess(status);
      setMessage(decodeURIComponent(msg));
      setShowAlert(true);
    }
  }, [searchParams, router]);
  return (
    <CustomAlert
      message={message}
      show={showAlert}
      success={success}
      onClose={() => setShowAlert(false)}
    />
  );
}
