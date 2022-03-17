<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'dosar_nr',
        'dosar_an',
        'data_deschidere',
        'instanta',
        'adresa_instanta',
        'creditor',
        'adresa_creditor',
        'debitor',
        'adresa_debitor',
        'banca',
        'adresa_banca',
        'cui',
        'titlul_executoriu',
        'inscrisuri',
        'format_titlu_executoriu',
        'cheltuieli_judecata',
        'debit',
        'taxa_timbru',
        'data_poprire',
        'data_incuviintare',
        'total_penalitati',
        'debit_plus_penalitati',
        'onorariu',
        'cheltuieli_materiale',
        'onorariu_avocat',
        'total_cheltuieli',
        'total_somatie',
        'data_eliberare',
        'data_recipisa',
        'suma_consmnata',
        'recipisa_nr',
        'suma_creditor',
        'op_nr_creditor',
        'suma_cheltuieli',
        'op_nr_cheltuieli',
        'nr_ff',
        'data_incetare',
        'total_penalitati_simple',
        
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
