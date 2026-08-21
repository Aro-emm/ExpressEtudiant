import { useEffect, useState } from "react";

const emptyForm = { nom: "", prenom: "", email: "", age: "" };

async function api(url, options) {
  const response = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(body?.message || "Une erreur est survenue");
  return body;
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    try { setLoading(true); setStudents((await api("/etudiants")).data); }
    catch (error) { setNotice(error.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { loadStudents(); }, []);

  function edit(student) {
    setEditingId(student.id);
    setForm({ nom: student.nom, prenom: student.prenom, email: student.email, age: student.age });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function submit(event) {
    event.preventDefault();
    const wasEditing = editingId !== null;
    try {
      const result = await api(wasEditing ? `/etudiants/${editingId}` : "/etudiants", {
        method: wasEditing ? "PUT" : "POST",
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      setStudents((current) => wasEditing ? current.map((item) => item.id === editingId ? result.data : item) : [...current, result.data]);
      setForm(emptyForm); setEditingId(null); setNotice(wasEditing ? "Fiche mise a jour" : "Etudiant ajoute");
    } catch (error) { setNotice(error.message); }
  }
  async function remove(id) {
    if (!window.confirm("Supprimer cet etudiant ?")) return;
    try { await api(`/etudiants/${id}`, { method: "DELETE" }); setStudents((current) => current.filter((item) => item.id !== id)); setNotice("Etudiant supprime"); }
    catch (error) { setNotice(error.message); }
  }
  const visible = students.filter((student) => `${student.prenom} ${student.nom} ${student.email}`.toLowerCase().includes(query.toLowerCase()));

  return <main className="shell">
    <header className="topbar"><div className="brand"><b>C</b><span>Campus</span></div><span className="status"><i /> API connectee</span></header>
    <section className="intro"><div><p className="eyebrow">Annuaire academique / 2024-25</p><h1>Les etudiants,<br /><em>en un regard.</em></h1></div><p className="intro-note">Un espace simple pour garder les profils du campus clairs, a jour et faciles a retrouver.</p></section>
    <section className="workspace">
      <form className="form-panel" onSubmit={submit}><div className="panel-heading"><span>{editingId ? "Modifier le profil" : "Nouveau profil"}</span><small>01 / 01</small></div>
        <div className="field-row"><label>Prenom<input name="prenom" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Jean" required /></label><label>Nom<input name="nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Rakoto" required /></label></div>
        <label>Email<input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jean.rakoto@campus.fr" required /></label><label>Age<input type="number" name="age" min="1" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="21" required /></label>
        <button className="primary" type="submit">{editingId ? "Enregistrer les changements" : "Ajouter l'etudiant"}<span>↗</span></button>{editingId && <button className="cancel" type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Annuler</button>}
      </form>
      <div className="list-panel"><div className="list-heading"><div><p className="eyebrow">Vue d'ensemble</p><h2>Repertoire <small>({students.length})</small></h2></div><button className="refresh" onClick={loadStudents} aria-label="Actualiser">↻</button></div>
        <div className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un etudiant..." /></div>{notice && <p className="notice">{notice}</p>}
        <div className="student-list">{loading ? <p className="empty">Chargement des profils...</p> : visible.length === 0 ? <p className="empty">Aucun etudiant trouve.</p> : visible.map((student, index) => <article className="student" key={student.id}><div className={`avatar a${index % 4}`}>{student.prenom[0]}{student.nom[0]}</div><div className="student-info"><h3>{student.prenom} {student.nom}</h3><p>{student.email}</p></div><span className="age">{student.age} ans</span><div className="actions"><button type="button" onClick={() => edit(student)} aria-label={`Modifier ${student.prenom}`}>✎</button><button type="button" onClick={() => remove(student.id)} aria-label={`Supprimer ${student.prenom}`}>×</button></div></article>)}</div>
      </div>
    </section>
    <footer><span>Campus Directory</span><span>Derniere synchronisation - maintenant</span></footer>
  </main>;
}
