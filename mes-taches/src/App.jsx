import { useEffect, useState } from 'react'
import Entete from './components/Entete'
import Carte from './components/Carte'
import Compteur from './components/Compteur'
import Horloge from './components/Horloge'
import FormulaireAjout from './components/FormulaireAjout'
import Filtres from './components/Filtres'
import ListeTaches from './components/ListeTaches'
import Statistiques from './components/Statistiques'
import Pied from './components/Pied'

function App() {
  const [taches, setTaches] = useState([])
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [filtre, setFiltre] = useState('toutes')

  // Partie B : charger les tâches depuis public/taches.json
  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`)
        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) setTaches(donnees)
      })
      .catch((err) => {
        if (!annule) setErreur(err.message)
      })
      .finally(() => {
        if (!annule) setChargement(false)
      })

    return () => {
      annule = true
    }
  }, [])

  const restantes = taches.filter((tache) => !tache.terminee).length

  // Partie C : titre de l'onglet
  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  function basculerTache(id) {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache,
      ),
    )
  }

  function supprimerTache(id) {
    setTaches(taches.filter((tache) => tache.id !== id))
  }

  function ajouterTache(titre) {
    setTaches([...taches, { id: Date.now(), titre, terminee: false }])
  }

  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') return !tache.terminee
    if (filtre === 'terminees') return tache.terminee
    return true
  })

  return (
    <div>
      <Entete titre="Mes tâches" sousTitre="Un premier projet React" />
      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>
      <Carte titre="Compteur">
        <Compteur />
      </Carte>
      <Carte titre="Nouvelle tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>
      <Carte titre="Ma liste">
        <Filtres filtre={filtre} onChanger={setFiltre} />
        {chargement && <p className="vide">Chargement des tâches…</p>}
        {erreur && <p className="erreur">{erreur}</p>}
        {!chargement && !erreur && (
          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        )}
      </Carte>
      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>
      <Pied auteur="Imane Mourhiya" />
    </div>
  )
}

export default App