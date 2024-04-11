function openForm() {
    document.getElementById("popupForm").style.display = "block"; 
    document.getElementById("main").style.filter = "blur(25px)";  
  }

  function closeForm() {
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("main").style.filter = "none";

  }

$(document).ready(function () {
  var nbreLigne = 0; 

  // chargement de la sauvegarde
  var saveTache = JSON.parse(localStorage.getItem('tache')) || [];
  nbreLigne = saveTache.length;
  saveTache.forEach(function(tache) {
    $("#listTache tbody").append('<tr><td>' + tache.numero + '</td><td>' + tache.taches + '</td><td>' + tache.dateDebut + '</td><td>' + tache.dateFin + '</td><td>' + tache.duree + ' jours</td><td><button class="sup"><i class="fas fa-trash"></i></button></td></tr>');
  });

  $(("#formData").submit).change(function (e) { 
    e.preventDefault();
    
  });
  // tâches total
  $("#total").append(nbreLigne); 

  // Filtrer tâches  accomplis
  var fait = saveTache.filter(function(tache) {
    return tache.duree === 0;
  }).length;

  $("#fait").text(fait);

  // Filtrer tâches  restant
  var reste = saveTache.filter(function(tache) {
    return tache.duree > 0;
  }).length;
  $("#reste").append(reste);
  
  // function pour ajouter une tâche
  $("#formData").submit(function (e) { 
    e.preventDefault(); 
    var taches = $("#tache").val();
    var dateDebut = new Date($("#dateDebut").val());
    var dateFin = new Date($("#dateFin").val());
    var dure = Math.abs(dateDebut - dateFin) / (1000 * 60 * 60 * 24);
    nbreLigne++; 

    // condition pour ajouter une tâche
    if(taches === '' || dateDebut.toLocaleDateString() === 'Invalid Date' || dateFin.toLocaleDateString() === 'Invalid Date'){
      alert("veuillez renseigner tout les champs ! "  ); 
    }
    else if(dateDebut > dateFin){
      alert("Verifier les dates saisis");
      nbreLigne--;
    }
    else{
      $("#listTache tbody").append('<tr><td>' + nbreLigne + '</td><td>' + taches + '</td><td>' + dateDebut.toLocaleDateString() + '</td><td>' + dateFin.toLocaleDateString() + '</td><td>' + dure + ' jours</td><td><button class="sup"><i class="fas fa-trash"></i></button></td></tr>');
      alert("ajout reussi avec succes !")
      
      var tache = JSON.parse(localStorage.getItem('tache')) || [];
      tache.push({numero: nbreLigne, taches: taches, dateDebut: dateDebut.toLocaleDateString(), dateFin: dateFin.toLocaleDateString(), duree: dure});
      localStorage.setItem('tache', JSON.stringify(tache)); 
      
      viderInput(); 
      closeForm();   
    }
  });
    
    // function pour supprimer la ligne et mettre a jour la sauvegarde
  $(document).on('click', '.sup', function() {
    if(confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")){
      var rowIndex = $(this).closest('tr').index();
      $(this).closest('tr').remove(); 
      
      var tache = JSON.parse(localStorage.getItem('tache')) || [];
      tache.splice(rowIndex, 1);
      localStorage.setItem('tache', JSON.stringify(tache));
    }
  });
  
  // function pour effectuer la recherche
  $("#find").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#listTache tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

}); 

function viderInput(){ 
  $("#tache").val("");
  $("#dateDebut").val("");
  $("#dateFin").val("");
}
