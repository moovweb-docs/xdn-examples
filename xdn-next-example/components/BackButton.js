import { useRouter } from 'next/router';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="container mb-8">
      <a onClick={() => router.back()}>
        <i className="arrow arrow-left"></i>back
      </a>
    </div>
  );
}
