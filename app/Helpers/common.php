<?php

if (! function_exists('test')) {
    function test()
    {
        return dd('test');
    }
}

if (! function_exists('flashMsg')) {
    function flashMsg($status, $msg)
    {
        Session::flash('msg_status', $status);
        Session::flash('msg', $msg);
    }
}


if (! function_exists('pageSetinfo')) {
    function pageSetinfo($pageName, $pageTitle)
    {
        Session::flash('pagename', $pageName);
        Session::flash('pagetitle', $pageTitle);
        Session::reflash();
    }
}


if (! function_exists('array_reafactor')) {
    function array_reafactor($arr)
    {
        $result = [];
        if ($arr == null) {
            return [];
        }
        foreach ($arr as $key => $value) {
            $i = 0;
            foreach($value as $val){
                $result[$i++][$key] = $val; 
            }
        }
        return $result;
    }
}