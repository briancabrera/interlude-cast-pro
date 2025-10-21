import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

const Q = gql`
  query Home($from: DateTime, $to: DateTime) {
    tenants { id key name }
    venues { id name slug }
    events(from: $from, to: $to) { id title startsAt endsAt }
  }
`;

export default function App() {
  const { from, to } = useMemo(() => {
    const now = new Date();
    const toDate = new Date(now.getTime() + 7*24*3600*1000);
    return { from: now.toISOString(), to: toDate.toISOString() };
  }, []);

  const { data, loading, error } = useQuery(Q, { variables: { from, to } });

  return (
    <div style={{ fontFamily:'Inter, system-ui', padding:24 }}>
      <h1>Interlude Cast Pro</h1>
      {loading && <p>Cargando…</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <h2>Tenants</h2>
          <pre>{JSON.stringify(data.tenants, null, 2)}</pre>
          <h2>Venues</h2>
          <pre>{JSON.stringify(data.venues, null, 2)}</pre>
          <h2>Próximos eventos</h2>
          <pre>{JSON.stringify(data.events, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
