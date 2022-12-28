<?php
error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "littlepony";
$db   = "myletter";

$koneksi = mysqli_connect($host, $user, $pass, $db);

$op = $_GET['op'];
switch ($op) {
    case '':
        normal();
        break;
    default:
        normal();
        break;
    case 'create':
        create();
        break;
    case 'detail':
        detail();
        break;
    case 'update':
        update();
        break;
    case 'delete':
        delete();
        break;
}

function normal()
{
    global $koneksi;
    $sql1 = "select * from suratins order by id desc";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'no_surat' => $r1['no_surat'],
            'dari_klien' => $r1['dari_klien'],
            'tgl_surat' => $r1['tgl_surat'],
            'tgl_terima' => $r1['tgl_terima'],
            'penerima' => $r1['penerima'],
            'deskripsi' => $r1['deskripsi'],
            'subject_id' => $r1['subject_id']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create()
{
    global $koneksi;
    $no_surat = $_POST['no_surat'];
    $dari_klien = $_POST['dari_klien'];
    $tgl_surat = $_POST['tgl_surat'];
    $tgl_terima = $_POST['tgl_terima'];
    $penerima = $_POST['penerima'];
    $deskripsi = $_POST['deskripsi'];
    $subject_id = $_POST['subject_id'];
    $hasil = "Gagal memasukkan data";
    if ($no_surat && $dari_klien && $tgl_surat && $tgl_terima && $penerima && $deskripsi && $subject_id) {
        $sql1 = "insert into suratins (no_surat,dari_klien,tgl_surat,tgl_terima,penerima,deskripsi,subject_id) values ('$no_surat','$dari_klien','$tgl_surat','$tgl_terima','$penerima','$deskripsi','$subject_id')";
        $q1 = mysqli_query($koneksi, $sql1);
        if ($q1) {
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail()
{
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "select * from suratins where id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'no_surat' => $r1['no_surat'],
            'dari_klien' => $r1['dari_klien'],
            'tgl_surat' => $r1['tgl_surat'],
            'tgl_terima' => $r1['tgl_terima'],
            'penerima' => $r1['penerima'],
            'deskripsi' => $r1['deskripsi'],
            'subject_id' => $r1['subject_id']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update()
{
    global $koneksi;
    $id = $_GET['id'];
    $no_surat = $_POST['no_surat'];
    $dari_klien = $_POST['dari_klien'];
    $tgl_surat = $_POST['tgl_surat'];
    $tgl_terima = $_POST['tgl_terima'];
    $penerima = $_POST['penerima'];
    $deskripsi = $_POST['deskripsi'];
    $subject_id = $_POST['subject_id'];
    if ($no_surat) {
        $set[] = "no_surat='$no_surat'";
    }
    if ($dari_klien) {
        $set[] = "dari_klien='$dari_klien'";
    }
    if ($tgl_surat) {
        $set[] = "tgl_surat='$tgl_surat'";
    }
    if ($tgl_terima) {
        $set[] = "tgl_terima='$tgl_terima'";
    }
    if ($penerima) {
        $set[] = "penerima='$penerima'";
    }
    if ($deskripsi) {
        $set[] = "deskripsi='$deskripsi'";
    }
    if ($subject_id) {
        $set[] = "subject_id='$subject_id'";
    }
    $hasil = "Gagal melakukan update data";
    if ($no_surat or $dari_klien or $tgl_surat or $tgl_terima or $penerima or $deskripsi or $subject_id) {
        $sql1 = "update suratins set " . implode(",", $set) . " where id = '$id'";
        $q1 = mysqli_query($koneksi, $sql1);
        if ($q1) {
            $hasil = "Data berhasil diupdate";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete()
{
    global $koneksi;
    $id = $_GET['id'];
    $sql1 = "delete from suratins where id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}
