// src/app/page.tsx
import Search from '@/components/Search';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-20 px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Financial Product Search
        </h1>
        <Search />
      </div>
    </main>
  );
}