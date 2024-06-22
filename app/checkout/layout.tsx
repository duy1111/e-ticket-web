// import { Sidebar } from "../_components/sidebar";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
    </main>
  );
};

export default CheckoutLayout;
