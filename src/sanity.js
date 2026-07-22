import { createClient } from '@sanity/client';
import { useEffect, useState, useCallback } from 'react';

export const sanity = createClient({
  projectId: '2azx4it8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false => siempre trae los cambios más recientes hechos en el Studio
});

// Consultas GROQ: traen el primer documento de cada tipo (simulador de una sola cuenta/perfil)
export const queries = {
  account: `*[_type == "account"][0]{
    _id, holder, type, totalBalance, balance, detailBalance, number, masked, status, fullNumber,
    limitDaily, limitDailyUsed, limitMonthly, limitMonthlyUsed
  }`,
  cdt: `*[_type == "cdt"][0]{ _id, title, promo }`,
  movements: `*[_type == "movement"] | order(order asc, _createdAt asc){
    _id, day, month, year, category, description, amount, cents, balance, positive, icon
  }`,
  profile: `*[_type == "profile"][0]{
    _id, items[]{ label, description, icon }
  }`,
  mailbox: `*[_type == "mailbox"][0]{
    _id, items[]{ label, icon, badge }
  }`,
};

// Hook genérico de fetch con estado de carga y función de recarga
export function useSanity(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    sanity
      .fetch(query, params)
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [query, JSON.stringify(params)]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

// Formatea números al estilo de las pantallas: 40.000,00
export function formatMoney(value) {
  if (value == null || isNaN(value)) return '0,00';
  const parts = Number(value).toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${parts[0]},${parts[1]}`;
}
