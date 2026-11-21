import { StudioGuide } from '@/components/StudioGuide'

export const metadata = { title: 'Współpraca — AK Visual' }

export default function CollaborationPage() {
  return (
    <StudioGuide
      label="Współpraca"
      title="Jak wygląda współpraca?"
      intro="Zaczynamy od rozmowy o tym, jak chcesz mieszkać i co ma się zmienić w Twoim wnętrzu."
      items={[
        {
          title: 'Rozmowa',
          text: 'Opowiedz nam o przestrzeni, swoich potrzebach i inspiracjach. Jeśli masz rzut, zdjęcia lub wstępny budżet, pomogą nam lepiej zrozumieć projekt.',
        },
        {
          title: 'Zakres projektu',
          text: 'Ustalamy, jakie pomieszczenia obejmie projekt, czego od nas potrzebujesz i jaki termin będzie odpowiedni.',
        },
        {
          title: 'Koncepcja i detale',
          text: 'Pracujemy nad układem, światłem i materiałami. Szczegóły oraz sposób przekazania projektu zależą od ustalonego zakresu.',
        },
      ]}
    />
  )
}
