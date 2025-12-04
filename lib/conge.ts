export function calculerCongesAcquis(dateEmbauche: string): number {
  const debut = new Date(dateEmbauche);
  const today = new Date();

  const mois =
    (today.getFullYear() - debut.getFullYear()) * 12 +
    (today.getMonth() - debut.getMonth());

  return mois * 2.5; 
}
