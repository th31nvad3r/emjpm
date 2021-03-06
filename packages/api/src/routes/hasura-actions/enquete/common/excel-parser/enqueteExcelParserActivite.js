const { enqueteExcelParser: parser } = require("./services");

function parse(ws) {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  return {
    curatelle_renforcee_domicile_debut_annee: parser.integer(ws["D9"]),
    curatelle_renforcee_domicile_fin_annee: parser.integer(ws["G9"]),
    curatelle_renforcee_domicile_mesures_nouvelles: parser.integer(ws["E9"]),
    curatelle_renforcee_domicile_sortie_mesures: parser.integer(ws["F9"]),
    curatelle_renforcee_etablissement_debut_annee: parser.integer(ws["D8"]),
    curatelle_renforcee_etablissement_fin_annee: parser.integer(ws["G8"]),
    curatelle_renforcee_etablissement_mesures_nouvelles: parser.integer(
      ws["E8"]
    ),
    curatelle_renforcee_etablissement_sortie_mesures: parser.integer(ws["F8"]),

    curatelle_simple_domicile_debut_annee: parser.integer(ws["D12"]),
    curatelle_simple_domicile_fin_annee: parser.integer(ws["G12"]),
    curatelle_simple_domicile_mesures_nouvelles: parser.integer(ws["E12"]),
    curatelle_simple_domicile_sortie_mesures: parser.integer(ws["F12"]),
    curatelle_simple_etablissement_debut_annee: parser.integer(ws["D11"]),
    curatelle_simple_etablissement_fin_annee: parser.integer(ws["G11"]),
    curatelle_simple_etablissement_mesures_nouvelles: parser.integer(ws["E11"]),
    accompagnement_judiciaire_etablissement_debut_annee: parser.integer(
      ws["D17"]
    ),

    curatelle_simple_etablissement_sortie_mesures: parser.integer(ws["F11"]),
    accompagnement_judiciaire_etablissement_fin_annee: parser.integer(
      ws["G17"]
    ),
    tutelle_domicile_debut_annee: parser.integer(ws["D15"]),
    accompagnement_judiciaire_domicile_debut_annee: parser.integer(ws["D18"]),
    tutelle_domicile_fin_annee: parser.integer(ws["G15"]),
    accompagnement_judiciaire_domicile_fin_annee: parser.integer(ws["G18"]),
    tutelle_etablissement_debut_annee: parser.integer(ws["D14"]),
    accompagnement_judiciaire_domicile_mesures_nouvelles: parser.integer(
      ws["E18"]
    ),

    tutelle_etablissement_fin_annee: parser.integer(ws["G14"]),
    accompagnement_judiciaire_domicile_sortie_mesures: parser.integer(
      ws["F18"]
    ),
    tutelle_etablissement_mesures_nouvelles: parser.integer(ws["E14"]),
    accompagnement_judiciaire_etablissement_mesures_nouvelles: parser.integer(
      ws["E17"]
    ),
    tutelle_etablissement_sortie_mesures: parser.integer(ws["F14"]),
    accompagnement_judiciaire_etablissement_sortie_mesures: parser.integer(
      ws["F17"]
    ),
    tutelle_domicile_mesures_nouvelles: parser.integer(ws["E15"]),
    curatelle_biens_domicile_debut_annee: parser.integer(ws["D21"]),

    tutelle_domicile_sortie_mesures: parser.integer(ws["F15"]),
    curatelle_biens_domicile_fin_annee: parser.integer(ws["G21"]),
    curatelle_biens_domicile_mesures_nouvelles: parser.integer(ws["E21"]),
    curatelle_biens_domicile_sortie_mesures: parser.integer(ws["F21"]),
    curatelle_biens_etablissement_debut_annee: parser.integer(ws["D20"]),
    curatelle_biens_etablissement_fin_annee: parser.integer(ws["G20"]),
    curatelle_biens_etablissement_mesures_nouvelles: parser.integer(ws["E20"]),
    curatelle_biens_etablissement_sortie_mesures: parser.integer(ws["F20"]),

    curatelle_personne_domicile_debut_annee: parser.integer(ws["D24"]),
    curatelle_personne_domicile_fin_annee: parser.integer(ws["G24"]),
    curatelle_personne_domicile_mesures_nouvelles: parser.integer(ws["E24"]),
    curatelle_personne_domicile_sortie_mesures: parser.integer(ws["F24"]),
    curatelle_personne_etablissement_debut_annee: parser.integer(ws["D23"]),
    curatelle_personne_etablissement_fin_annee: parser.integer(ws["G23"]),
    curatelle_personne_etablissement_mesures_nouvelles: parser.integer(
      ws["E23"]
    ),
    curatelle_personne_etablissement_sortie_mesures: parser.integer(ws["F23"]),

    mandat_adhoc_majeur_debut_annee: parser.integer(ws["D28"]),
    mandat_adhoc_majeur_fin_annee: parser.integer(ws["G28"]),
    sauvegarde_justice_debut_annee: parser.integer(ws["D27"]),
    mandat_adhoc_majeur_mesures_nouvelles: parser.integer(ws["E28"]),

    sauvegarde_justice_fin_annee: parser.integer(ws["G27"]),
    mandat_adhoc_majeur_sortie_mesures: parser.integer(ws["F28"]),
    subroge_tuteur_createur_debut_annee: parser.integer(ws["D26"]),
    revisions_autre: parser.integer(ws["C43"]),

    subroge_tuteur_createur_fin_annee: parser.integer(ws["G26"]),
    revisions_changement: parser.integer(ws["C42"]),
    subroge_tuteur_createur_mesures_nouvelles: parser.integer(ws["E26"]),
    revisions_main_levee: parser.integer(ws["C39"]),

    subroge_tuteur_createur_sortie_mesures: parser.integer(ws["F26"]),
    revisions_masp: parser.integer(ws["C40"]),
    sauvegarde_justice_mesures_nouvelles: parser.integer(ws["E27"]),
    revisions_reconduction: parser.integer(ws["C41"]),
    sauvegarde_justice_sortie_mesures: parser.integer(ws["F27"]),

    sorties_deces: parser.integer(ws["C51"]),
    sorties_main_levee: parser.integer(ws["C50"]),
    sorties_masp: parser.integer(ws["C52"]),
  };
}

const enqueteExcelParserActivite = {
  parse,
};

module.exports = enqueteExcelParserActivite;
