// Données de jeu vérifiées dans le code de l'application mobile (stores zones, œufs, familiers, bonus).
import vallee from '../assets/zones/vallee-verte.webp';
import cote from '../assets/zones/cote-tropicale.webp';
import foret from '../assets/zones/foret-sucree.webp';
import archipel from '../assets/zones/archipel-celeste.webp';
import banquise from '../assets/zones/banquise.webp';
import recif from '../assets/zones/recif-englouti.webp';
import caldeira from '../assets/zones/caldeira.webp';

export const ZONES = [
  { id: 'vallee-verte', name: 'Vallée verte', img: vallee, resource: 'Trèfles', bonus: 'Rosée du matin : +15 % de pièces avant 10 h', tint: '#D6EADA', note: 'Zone de départ' },
  { id: 'cote-tropicale', name: 'Côte tropicale', img: cote, resource: 'Coquillages', bonus: 'Marée montante : +20 % de pièces le week-end', tint: '#D3EEEA' },
  { id: 'foret-sucree', name: 'Forêt sucrée', img: foret, resource: 'Bonbons', bonus: 'Arôme de caramel : +10 % de pièces en continu', tint: '#FCE6E6' },
  { id: 'archipel-celeste', name: 'Archipel céleste', img: archipel, resource: 'Plumes', bonus: 'Vent porteur : +25 % de pièces dès 10 000 pas dans la journée', tint: '#ECF5FA' },
  { id: 'banquise', name: 'Banquise', img: banquise, resource: 'Cristaux de glace', bonus: 'Air glacé : +15 % de pièces la nuit', tint: '#DCF0FB' },
  { id: 'recif-englouti', name: 'Récif englouti', img: recif, resource: 'Perles', bonus: 'Courant profond : +20 % de pièces en permanence', tint: '#C2DFEC' },
  { id: 'caldeira', name: 'Caldeira', img: caldeira, resource: 'Braises', bonus: 'Chaleur ardente : +20 % de pièces en soirée', tint: '#DDCFCD' },
] as const;

// Anti-spoil : seules les 2 premières zones sont détaillées sur le site, les autres sont floutées.
export const ZONES_REVEALED = 2;
export const PETS_REVEALED_IDS = ['brume', 'guimauve', 'chance'];
const lockedZoneImgs = import.meta.glob('../assets/locked/zones/*.webp', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;
export const lockedZoneImg = (id: string) => lockedZoneImgs[`../assets/locked/zones/${id}.webp`];
const lockedPetImgs = import.meta.glob('../assets/locked/familiers/*.webp', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;
export const lockedPetImg = (id: string) => lockedPetImgs[`../assets/locked/familiers/${id}.webp`];

const pets = ['bourgeon', 'brume', 'chance', 'eclat', 'embrun', 'foudre', 'goutte', 'guimauve', 'lierre', 'lueur', 'mousseline', 'nacre', 'pollen', 'racine', 'silex', 'tison'] as const;
const petImgs = import.meta.glob('../assets/familiers/*.webp', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;
const petsAll = pets.map((id) => ({
  id,
  name: id.charAt(0).toUpperCase() + id.slice(1),
  img: petImgs[`../assets/familiers/${id}.webp`],
}));

const eggIds = ['mousseux', 'brindille', 'silex', 'sable', 'corail', 'perle', 'brume', 'tonnerre', 'lave', 'stellaire'] as const;
const eggImgs = import.meta.glob('../assets/oeufs/*.webp', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;
export const EGGS = eggIds.map((id) => ({ id, img: eggImgs[`../assets/oeufs/${id}.webp`] }));

// Familiers montrés d'abord (dans l'ordre), puis les autres (cachés).
export const PETS_SHOWN = PETS_REVEALED_IDS.map((id) => petsAll.find((p) => p.id === id)!);
export const PETS_HIDDEN = petsAll.filter((p) => !PETS_REVEALED_IDS.includes(p.id));
export const PETS = [...PETS_SHOWN, ...PETS_HIDDEN];
