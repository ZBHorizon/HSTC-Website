<?php
// ...existing code or bootstrap...

// Database connection (Beispieldaten)
$mysqli = new mysqli("10.35.46.140:3306", "k217711_hstc_user", "SuperSecretPass123", "k217711_hstc_db");

// Handle Discord OAuth2 callback (clientSecret nur hier)
if (isset($_GET['code'])) {
    // ...exchange code for access_token...
    // ...fetch user info, store in DB...
}

// Star Citizen verification stub
if ($_POST['action'] === 'sc_verify') {
    // ...generate random code, store in DB...
    // ...verify code in SC-Bio...
}

// Ship management stub
if ($_POST['action'] === 'update_ships') {
    // ...save ship data to DB...
}

echo json_encode(['status'=>'ok']); // Example response
