"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="app-shell">
      <div className="error-state">
        <p className="eyebrow">Error</p>
        <h1>Todo를 불러오지 못했습니다.</h1>
        <p>백엔드 서버 연결을 확인한 뒤 다시 시도해주세요.</p>
        <button className="primary-button" type="button" onClick={reset}>
          다시 시도
        </button>
      </div>
    </main>
  );
}
