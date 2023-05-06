import { toast } from "@zerodevx/svelte-toast";

const BASE_APP_URL = import.meta.env.VITE_BASE_APP_URL;

export const activateToast = (type: string, message: string) => {
  if (type === "success") {
    toast.push(message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(72,187,120,0.9)",
        "--toastBarHeight": 0,
      },
    });
  } else if (type === "error") {
    toast.push(message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(220,38,38,0.9)",
        "--toastBarHeight": 0,
      },
    });
  } else if (type === "warning") {
    toast.push(message, {
      theme: {
        "--toastColor": "mintcream",
        "--toastBackground": "rgba(255,193,7,0.9)",
        "--toastBarHeight": 0,
      },
    });
  }
};

export const copyToClipboard = (tinyUrl: string) => {
  activateToast("success", "URL copiada com sucesso!");
  const el = document.createElement("textarea");
  el.value = `${BASE_APP_URL}/redirect/${tinyUrl}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const convertDate = (dateString: any) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;
  return formattedDate;
};
