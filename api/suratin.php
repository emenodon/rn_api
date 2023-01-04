<?php
error_reporting(0);

$host = "localhost";
$user = "root";
$pass = "littlepony";
$db   = "notes";

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
    $sql1 = "select * from note order by id desc";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'title' => $r1['title'],
            'deskripsi' => $r1['deskripsi'],
            'tanggal_input' => $r1['tanggal_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create()
{
    global $koneksi;
    $title = $_POST['title'];
    $deskripsi = $_POST['deskripsi'];
    $hasil = "Gagal memasukkan data";
    if ($title && $deskripsi) {
        $sql1 = "insert into note (title,deskripsi) values ('$title','$deskripsi')";
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
    $sql1 = "select * from note where id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'title' => $r1['title'],
            'deskripsi' => $r1['deskripsi'],
            'tanggal_input' => $r1['tanggal_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update()
{
    global $koneksi;
    $id = $_GET['id'];
    $title = $_POST['title'];
    $deskripsi = $_POST['deskripsi'];
    if ($title) {
        $set[] = "title='$title'";
    }
    if ($deskripsi) {
        $set[] = "deskripsi='$deskripsi'";
    }
    $hasil = "Gagal melakukan update data";
    if ($title or $deskripsi) {
        $sql1 = "update note set " . implode(",", $set) . " where id = '$id'";
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
    $sql1 = "delete from note where id = '$id'";
    $q1 = mysqli_query($koneksi, $sql1);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}
