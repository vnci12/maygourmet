function supprimer(id) {
    const routeComplete = '/api/equipe/' + id;
    fetch(
        routeComplete, { method: "DELETE" }
    ).then(
            (response) => response.json()
    ).then(
            (donnee) => window.location.href = donnee.routeAcceuil
    ).catch(
            (error) => console.log(error)
    )
};
/*
function modifier(id, nom, prenom, poste, mail, telephone, adress_postale, presentation, date_recrutement) {
    // Implementation for modifying a team member
        const routeComplete = '/api/equipe/' + id;
        const data = {
            id: id,
            nomMembreEquipe: nom,
            prenomMembreEquipe: prenom,
            posteMembreEquipe: poste,
            mailMembreEquipe: mail,
            telephoneMembreEquipe: telephone,
            adress_postaleMembreEquipe: adress_postale,
            presentationMembreEquipe: presentation,
            date_recrutementMembreEquipe: date_recrutement
        };
        fetch(
            routeComplete, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(
                (response) => response.json()
                
        ).then(
                (donnee) => window.location.href = donnee.routeAcceuil
        ).catch(
                (error) => console.log(error)
        )

}*/