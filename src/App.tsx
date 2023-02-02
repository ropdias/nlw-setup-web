import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import "./styles/global.css";
import "./lib/dayjs";
import { api } from "./lib/axios";

navigator.serviceWorker
  .register("service-worker.js")
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      const publicKeyResponse = await api.get("/push/public_key");

      subscription = await serviceWorker.pushManager.subscribe({
        applicationServerKey: publicKeyResponse.data.publicKey,
        userVisibleOnly: true,
      });
    }

    // Sending the subscription to the backend to save in the database so we can use
    // that subscription to send messages to the user
    await api.post("/push/register", {
      subscription,
    });

    // Just to test but we can send notifications to the user now from the backend
    // await api.post("/push/send", {
    //   subscription,
    // });
  });

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}
