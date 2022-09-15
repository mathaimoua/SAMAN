

function NewForm() {
  return (
    <div className="newFormContainer">
      <form>
        <header>Modifier mon profil</header>
        <hr />
        <div className="form-rows">
          <div className="form-row form-row-a">
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" />
          </div>
          <div className="form-row form-row-b">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" name="prenom" />
          </div>
          <div className="form-row form-row-c">
            <label htmlFor="bio">Bio</label>
            <textarea name="bio" cols="30" rows="8"></textarea>
          </div>
          <div className="form-row form-row-d">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="monemail@demo.fr" />
          </div>
          <div className="form-row form-row-e">
            <label htmlFor="adresse">Téléphone (mobile)</label>
            <input type="text" name="telephone" />
          </div>
          <div className="form-row form-row-f">
            <label htmlFor="adresse">Adresse</label>
            <input type="email" name="adresse" />
          </div>
          <div className="form-row form-row-g">
            <label htmlFor="ville">Ville</label>
            <input type="text" name="ville" />
          </div>
          <div className="form-row form-row-h">
            <label htmlFor="code-postal">Code postal</label>
            <input type="text" name="code-postal" />
          </div>
          <div className="form-row-i checkboxes">
            <div className="checkbox">
              <input type="checkbox" />
              <label htmlFor="newsletter">Je souhaite recevoir la newsletter</label>
            </div>
            <div className="checkbox">
              <input type="checkbox" />
              <label htmlFor="newsletter-partenaires">
                Je souhaite recevoir la newsletter des partenaires
              </label>
            </div>
          </div>
        </div>
        <div className="button-parent">
          <button type="button" name="submit-button">
            Enregistrer mes modifications
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewForm;
