export default function NotAvailablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-200 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="text-5xl mb-2">🇸🇦</div>
        <div className="text-4xl mb-4">🚫</div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          الخدمة غير متاحة
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          نعتذر، هذا الموقع متاح حاليًا فقط داخل{" "}
          <span className="font-semibold text-black">
            المملكة العربية السعودية
          </span>
          .
        </p>
      </div>
    </div>
  );
}
