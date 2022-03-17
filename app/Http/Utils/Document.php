<?php

namespace App\Http\Utils;

use ZipArchive;
use Exception;

class Document 
{

    protected $templates;
    protected $result_path;
    protected $template_path;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->templates = [
            '1. Incheiere deschidere dosar.docx',
            '2. Adresa instanta.docx',
            '3. Incheiere calcul penalitati.docx',
            '4. Incheiere cheltuieli executare + avocat.docx',
            '5. Somatie.docx',
            '6. Poprire.docx',
            '7. Instiintare poprire.docx',
            '8. Incheiere eliberare sume debit + onorariu.docx',
            '9. Incetarea executarii.docx',
        ];
        $this->template_path = 'templates/';
        $this->result_path = 'result/';
    }

    public function makeDocFromTemplate($template_num, $data, $penas = [])
    {
        $template_file = $this->template_path.$this->templates[$template_num - 1];

        $fileName = $this->templates[$template_num - 1];
        
        // if(!array_key_exists('dosar_an' , $data) || !array_key_exists('dosar_nr' , $data)){
        //     return 0;
        // }
        if ($data['dosar_an'] == null || $data['dosar_nr'] == null ) {
            return 0;
        }
        $fileName = substr($fileName, 0, -5).' '.$data['dosar_nr'].'.docx';
            
        $realFile = $this->result_path . $data['dosar_an'] . '/' . $data['dosar_nr'] . '/' . $fileName; 

        try {
            if (!file_exists($this->result_path)) {
                mkdir($this->result_path);
            }
            if (!file_exists($this->result_path. $data['dosar_an'])) {
                mkdir($this->result_path. $data['dosar_an']);
            }
            if (!file_exists($this->result_path . $data['dosar_an'] . '/' . $data['dosar_nr'])) {
                mkdir($this->result_path . $data['dosar_an'] . '/' . $data['dosar_nr']);
            }

            if (file_exists($realFile)) {
                unlink($realFile);
            }
            
            //Copy the data Template value file to the Result Directory
            copy($template_file, $realFile);

            // add new calss Zip Archive
            $zip = new ZipArchive;

            //Docx simple file is nothing but a created zip file. and then Open this Zip File
            if ($zip->open($realFile) == true) {
                // In the simple Open XML Wordprocessing data value format content is stored.
                // In the main document.xml simple file located in the data word main_dir.

                $key_file_name = 'word/document.xml';
                $xml = $zip->getFromName($key_file_name);
                
                // this data Replace the placeholders with actual values
                // dd($data->toArray());
                
                if($template_num == 1 || $template_num == 2){
                    // penalitati process
                    $temp = "";
                    foreach ($penas as $key => $pena) {
                        if($pena['type'] == 1){
                            $temp .= "precum și penalități de întârziere de ".$pena['procent_zi']."% pe zi de întârziere calculate asupra debitului principal, începând cu data de ".$pena['dela']." și până la plata efectivă, ";    
                        }else if($pena['type'] == 2 || $pena['type'] == 3){
                            $temp .= "precum și penalități de întârziere de ".$pena['procent_zi']."% pe zi de întârziere calculate asupra sumei de ".$pena['asupra']." lei, începând cu data de ".$pena['dela']." și până la ".$pena['pana_la'] .", ";
                        }else if($pena['type'] == 4)
                        {
                            $temp .= $pena['penalitati_simple']." lei, reprezentând penalități de întarziere, ";
                        }
                    }
                    $temp = substr($temp, 0, -2);
                    $xml = str_replace("«penalitati»", $temp, $xml);

                    // cheltuieli_judecata process
                    $temp = $data['cheltuieli_judecata']?$data['cheltuieli_judecata'].', ':'';
                    $xml = str_replace("«cheltuieli_judecata»", $temp, $xml);

                    // debit process
                    $temp = $data['debit']?$data['debit'].', ':'';
                    $xml = str_replace("«debit»", $temp, $xml);


                }
                else if($template_num == 3){
                    $k = "";
                    if(count($penas) == 0){
                        $zip->close();
                        unlink($realFile);
                        return 0;
                    }
                    foreach ($penas as $key => $pena) {
                        if($pena['type'] == 4) continue;
                        $pana_la = $pena['pana_la'];
                        if($key == 0) $k = "AAA";
                        if($key == 1) $k = "BBB";
                        if($key == 2) $k = "CCC";
                        if($pena['type'] == 1){
                            $pana_la = $data->data_poprire;
                        }
                        $temp = "-	suma de ".$pena['asupra']." lei x ".$pena['procent_zi']."% pe zi de întârziere x ".$pena['zile']." zile (perioada ".$pena['dela']." - ".$pana_la.") = ".$pena['suma']." lei";    
                        $xml = str_replace($k, $temp, $xml);
                    }
                    $temp = "";
                    if($k == ""){
                        $xml = str_replace("AAA", $temp, $xml);
                        $xml = str_replace("BBB", $temp, $xml);
                        $xml = str_replace("CCC", $temp, $xml);
                    }else if ($k == "AAA"){
                        $xml = str_replace("BBB", $temp, $xml);
                        $xml = str_replace("CCC", $temp, $xml);
                    }else if ($k == "BBB"){
                        $xml = str_replace("CCC", $temp, $xml);
                    }
                }
                else if($template_num == 4){
                    $temp = $data['onorariu_avocat']?'- '.$data['onorariu_avocat'].' lei, reprezentând onorariu avocat':'';
                    $xml = str_replace("«onorariu_avocat»", $temp, $xml);
                }
                else if($template_num == 5){
                    $temp = $data['cheltuieli_judecata']?'- '.$data['cheltuieli_judecata']:'';
                    $xml = str_replace("«cheltuieli_judecata»", $temp, $xml);

                    $temp = $data['total_penalitati_simple']?($data['total_penalitati_simple']!='0,00'?'- '.$data['total_penalitati_simple'].' lei, reprezentând penalități':''):'';
                    $xml = str_replace("«total_penalitati»", $temp, $xml);

                    $temp = $data['debit']?'- '.$data['debit']:'';
                    $xml = str_replace("«debit»", $temp, $xml);
                }

                foreach ($data->toArray() as $key => $value) {
                    if($value == null) $value = "";
                    if($key == 'id') continue;
                    $xml = str_replace('«'.$key.'»', $value, $xml);
                }

                //Replace the student data content with the new create content created above.
                $zip->addFromString($key_file_name, $xml);
                $zip->close();
                return 1;
            }
            return 0;
        } catch (Exception $exc) {
            $error_message =  "Simple Error making the Word Document";
            report($exc);
            dd($exc);
        }
    }


    public function existDoc($dosar_nr, $dosar_an)
    {
        $dir = $this->result_path.$dosar_an. '/' . $dosar_nr;
        if (!file_exists($dir)) {
            return [];
        }
        $files = $this->templates;
        $exist_files = [];
        foreach ($files as $file) {
                $file = substr($file, 0, -5).' '.$dosar_nr.'.docx';
            if (file_exists($dir.'/'.$file)) {
                array_push($exist_files, $file); 
            }
        } 
        return $exist_files;
    }


}
