
import Entete from './components/Entete'
import Carte from './components/Carte'
import ListeTaches from './components/ListeTaches'
import Pied from './components/Pied'

const TACHES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]

function App() {
  return (
    <div>
      <Entete titre="Mes tâches" sousTitre="Un premier projet React" />
      <Carte titre="Ma liste">
        <ListeTaches taches={TACHES} />
      </Carte>
      <Pied auteur="Imane Mourhiya" />
    </div>
  )
}

export default App