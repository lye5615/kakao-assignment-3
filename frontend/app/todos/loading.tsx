export default function Loading() {
  return (
    <main className="app-shell" aria-busy="true">
      <div className="loading-state">
        <span className="loading-indicator" />
        <p>Todo를 불러오는 중입니다.</p>
      </div>
    </main>
  );
}
