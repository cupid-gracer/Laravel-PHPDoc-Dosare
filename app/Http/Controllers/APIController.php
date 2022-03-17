<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Utils\Document;
use App\Models\Project;
use App\Models\Pena;

class APIController extends Controller
{

    protected $doc;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->doc= new Document;
        // pageSetinfo('step1', 'Dosar nou');
        // $this->middleware(['auth']);
    }


    public function fetchData1($type, $data){
        $data;
        switch ($type) {
            case 'dosar_an':
                $data = [2021,2022,2023,2024];
                $data = $this->pullYear();
                break;
            case 'creditor':
                $data = [];
                break;
            case 'adresa_creditor':
                $data = [];
                break;   
            case 'debitor':
                $data = [];
                break;
            case 'adresa_debitor':
                $data = [];
                break;               
            case 'format_titlu_executoriu':
                $data = [1,2,3,4,5,6,7,8,112,113,115,222,223,225];
                break;
            
            case 'penalitati':
                $data = ["Andorra","United Arab Emirates","Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia","Angola","Antarctica","Argentina","American Samoa","Austria","Australia","Aruba","Åland","Azerbaijan","Bosnia and Herzegovina","Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain","Burundi","Benin","Saint Barthélemy","Bermuda","Brunei","Bolivia","Bonaire","Brazil","Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize","Canada","Cocos [Keeling] Islands","Congo","Central African Republic","Republic of the Congo","Switzerland","Ivory Coast","Cook Islands","Chile","Cameroon","China","Colombia","Costa Rica","Cuba","Cape Verde","Curacao","Christmas Island","Cyprus","Czechia","Germany","Djibouti","Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia","Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji","Falkland Islands","Micronesia","Faroe Islands","France","Gabon","United Kingdom","Grenada","Georgia","French Guiana","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia and the South Sandwich Islands","Guatemala","Guam","Guinea-Bissau","Guyana","Hong Kong","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","Isle of Man","India","British Indian Ocean Territory","Iraq","Iran","Iceland","Italy","Jersey","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Comoros","Saint Kitts and Nevis","North Korea","South Korea","Kuwait","Cayman Islands","Kazakhstan","Laos","Lebanon","Saint Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova","Montenegro","Saint Martin","Madagascar","Marshall Islands","Macedonia","Mali","Myanmar [Burma]","Mongolia","Macao","Northern Mariana Islands","Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre and Miquelon","Pitcairn Islands","Puerto Rico","Palestine","Portugal","Palau","Paraguay","Qatar","Réunion","Romania","Serbia","Russia","Rwanda","Saudi Arabia","Solomon Islands","Seychelles","Sudan","Sweden","Singapore","Saint Helena","Slovenia","Svalbard and Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname","South Sudan","São Tomé and Príncipe","El Salvador","Sint Maarten","Syria","Swaziland","Turks and Caicos Islands","Chad","French Southern Territories","Togo","Thailand","Tajikistan","Tokelau","East Timor","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad and Tobago","Tuvalu","Taiwan","Tanzania","Ukraine","Uganda","U.S. Minor Outlying Islands","United States","Uruguay","Uzbekistan","Vatican City","Saint Vincent and the Grenadines","Venezuela","British Virgin Islands","U.S. Virgin Islands","Vietnam","Vanuatu","Wallis and Futuna","Samoa","Kosovo","Yemen","Mayotte","South Africa","Zambia","Zimbabwe"];
                break;
            
            default:
                $data=[];
                break;
        }
        // dd($data);

        // return response()->json($data);
        return ($data);
    }

    public function fetchData($type, $data){
        $result = Project::select($type)->groupBy($type)->orderBy($type, 'asc')->get();
        $arr = [];
        foreach ($result as $item) {
            array_push($arr, $item[$type]);
        }
        return $arr;
    }


    public function getProject($dosar_nr, $dosar_an)
    {
        $project = Project::where('dosar_nr', $dosar_nr)->where('dosar_an', $dosar_an)->first();
        $status = 200;
        $penas = [];
        if($project){
            $penas = Pena::where('project_id', $project->id)->get();
            if(!count($penas))$penas = [];
        }
        else
        {
            return response()->json(['status' => 400, 'msg' => __('msg.no_data')]);
        }
        
        return response()->json(['status' => 200, 'msg' => __('msg.success_get_data') , 'data' => ['project' => $project, 'penas' => $penas, 'file_list' => $this->doc->existDoc($dosar_nr, $dosar_an)]]);
    }

    public function matchFill($from, $to, $search_val)
    {
        $result = Project::select($to)->where($from, $search_val)->latest('updated_at')->first();
        if($result) return ['status' => 200, 'result'=>$result[$to]];
        return ['status' => 400];
    }

    
}
