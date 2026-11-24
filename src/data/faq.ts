import { PRIVACY_URL } from '../config';

// Réponses vérifiées dans le code de l'application. Le HTML est autorisé (liens).
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Qu'est-ce qu'Idle Walk ?",
    a: "<p>Idle Walk est un jeu mobile de marche pour Android. Tu marches dans la vraie vie, tes pas se transforment en pièces, et ces pièces font progresser ton personnage : bonus, nouvelles zones, œufs à faire éclore et familiers à collectionner. C'est un jeu « idle » : il avance pendant que tu marches, sans que tu aies à rester les yeux sur l'écran.</p>",
  },
  {
    q: 'Idle Walk est-il gratuit ?',
    a: "<p>Oui, l'application se télécharge et se joue gratuitement. En version gratuite, les pas se convertissent en pièces jusqu'à 1 500 pas par jour (ton compteur de pas réel, lui, n'est jamais limité). Un Premium optionnel, proposé dans l'app avec un essai gratuit, débloque notamment les œufs, les familiers, la Maison et la fin de cette limite quotidienne. Les prix exacts sont affichés par Google Play au moment de l'achat.</p>",
  },
  {
    q: 'Comment fonctionne le compteur de pas ?',
    a: "<p>Idle Walk lit les pas de ton téléphone Android : le capteur de mouvement pour le suivi en direct, et Health Connect pour retrouver l'historique des pas. L'application ne fait que lire tes pas, elle n'écrit rien dans Health Connect. Pour un comptage plus fiable, garde ton téléphone sur toi pendant la marche.</p>",
  },
  {
    q: 'Comment gagner des pièces ?',
    a: "<p>Chaque pas te rapporte des pièces. Tu augmentes ensuite le nombre de pièces par pas grâce aux bonus (permanents ou temporaires), aux effets des zones, à ton familier actif et à ta série de jours de marche. Tu peux aussi réclamer des pièces en terminant les défis du jour et de la semaine.</p>",
  },
  {
    q: 'Comment débloquer de nouveaux univers ?',
    a: "<p>Idle Walk compte 7 zones, à partir de la Vallée verte. Tu débloques chaque nouvelle zone avec les pièces gagnées en marchant, directement depuis la carte des zones. Dans certaines zones, un boss garde l'accès : il faut le distancer en marchant, sans se faire rattraper.</p>",
  },
  {
    q: "L'application fonctionne-t-elle en arrière-plan ?",
    a: "<p>Oui, tu n'as pas besoin de garder l'application ouverte. Sur Android, tes pas sont comptés par le téléphone et relus via Health Connect : même si tu fermes complètement l'application, les pas marchés sont retrouvés à la réouverture et convertis en pièces (tu vois un récapitulatif).</p>",
  },
  {
    q: 'Idle Walk est-il disponible sur iOS ?',
    a: "<p>Pour l'instant, Idle Walk est disponible sur Android, sur Google Play. Il n'y a pas de version iPhone à ce jour.</p>",
  },
  {
    q: 'Faut-il une connexion Internet ?',
    a: "<p>Non, pas en permanence : tes pas, tes pièces et ta progression sont enregistrés sur ton téléphone, et le jeu garde en mémoire ses derniers réglages. Une connexion est utile pour le classement, pour les achats et abonnements via Google Play, et pour récupérer les mises à jour d'équilibrage du jeu.</p>",
  },
  {
    q: 'Quelle version d’Android faut-il ?',
    a: "<p>Idle Walk demande Android 8.0 ou plus récent. La fiche Google Play indique si ton appareil est compatible.</p>",
  },
  {
    q: 'Idle Walk est-il une application de santé ou de perte de poids ?',
    a: "<p>Non. Idle Walk est un jeu : il transforme tes pas en progression ludique, mais il ne donne aucun conseil médical et ne promet aucun résultat sur la santé ou le poids.</p>",
  },
  {
    q: 'Que deviennent mes données ?',
    a: `<p>Ta progression reste stockée sur ton téléphone. Quelques données sont envoyées pour faire fonctionner le classement, et une mesure d'audience anonyme est utilisée. Tout est détaillé dans la <a href="${PRIVACY_URL}" rel="noopener">politique de confidentialité</a>.</p>`,
  },
];
