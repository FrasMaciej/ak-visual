import { StudioGuide } from '@/components/StudioGuide'

export const metadata = { title: 'Oferta projektowa — AK Visual' }

export default function DesignOffersPage() {
  return (
    <StudioGuide
      label="Oferta projektowa"
      title="Projekt wnętrza na miarę."
      intro="Zakres projektu dopasowujemy do przestrzeni i do tego, jakiego wsparcia potrzebujesz."
      items={[
        {
          title: 'Układ wnętrza',
          text: 'Rozmawiamy o tym, jak korzystasz z pomieszczeń, i szukamy układu, który ułatwi codzienne życie.',
        },
        {
          title: 'Koncepcja wizualna',
          text: 'Łączymy kolor, materiały i światło, by nadać wnętrzu spójny charakter.',
        },
        {
          title: 'Zakres i wycena',
          text: 'Napisz nam, które pomieszczenia chcesz zaprojektować i na jakim etapie jesteś. Na tej podstawie omówimy zakres oraz wycenę.',
        },
      ]}
    />
  )
}
