<?php
session_start();
$encryptedTextDirectory = "encrypted_texts/";
$githubClientId = "your_github_client_id";
$githubClientSecret = "your_github_client_secret";
$githubRedirectUri = "http://your_domain.com/github_callback.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["register"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        if (registerUser($username, $password)) {
            echo "User registered successfully.";
        } else {
            echo "Error registering user.";
        }
    } elseif (isset($_POST["login"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        if (loginUser($username, $password)) {
            echo "Login successful.";
        } else {
            echo "Invalid username or password.";
        }
    } elseif (isset($_POST["github_login"])) {
        header("Location: https://github.com/login/oauth/authorize?client_id=$githubClientId&redirect_uri=$githubRedirectUri&scope=user");
        exit();
    } elseif (isset($_POST["encrypt"])) {
        $userInput = $_POST["userInput"];

        if (!isValidInput($userInput)) {
            echo "Invalid input. Please enter a valid text.";
        } elseif (createUserAccount($userInput)) {
            echo "User account created successfully. Encrypted Text: $encryptedInput";
        } else {
            echo "Error creating user account.";
        }
    }
}

if (isset($_POST["key"])) {
    $enteredKey = $_POST["key"];

    if ($userInfo = getUserInfo($enteredKey)) {
        $encryptedText = $userInfo["encryptedText"];
        $decryptedText = decryptText($encryptedText);

        echo "Decrypted Text for User '{$userInfo["username"]}': $decryptedText";
    } else {
        echo "Invalid Key";
    }
}

function isValidInput($input) {
    return !empty($input);
}

function createUserAccount($username) {
    global $encryptedTextDirectory;

    $encryptedTextFile = $encryptedTextDirectory . $username . ".txt";

    if (!file_exists($encryptedTextDirectory)) {
        mkdir($encryptedTextDirectory, 0777, true);
    }

    $encryptedInput = encryptText($username);

    if (file_put_contents($encryptedTextFile, $encryptedInput)) {
        return true;
    }

    return false;
}

function registerUser($username, $password) {
    return true; // Placeholder, implement actual logic
}

function loginUser($username, $password) {
    $_SESSION["username"] = $username;
    return true; // Placeholder, implement actual logic
}

function getUserInfo($enteredKey) {
    global $encryptedTextDirectory;

    $userFiles = glob($encryptedTextDirectory . "*.txt");

    foreach ($userFiles as $userFile) {
        $username = pathinfo($userFile, PATHINFO_FILENAME);
        $encryptedText = file_get_contents($userFile);
        $decryptedText = decryptText($encryptedText);

        if (password_verify($enteredKey, $decryptedText)) {
            return ["username" => $username, "encryptedText" => $encryptedText];
        }
    }

    return false;
}

function encryptText($text) {
    return base64_encode($text);
}

function decryptText($encryptedText) {
    return base64_decode($encryptedText);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP All-in-One</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }

        .container {
            margin-top: 50px;
        }

        form {
            margin-bottom: 20px;
        }

        label {
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <form method="post" action="">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <input type="submit" class="btn btn-primary" name="register" value="Register">
            <input type="submit" class="btn btn-primary" name="login" value="Login">
            <input type="submit" class="btn btn-primary" name="github_login" value="Login with GitHub">
        </form>

        <form method="post" action="">
            <div class="form-group">
                <label for="userInput">Enter Text:</label>
                <input type="text" class="form-control" name="userInput" required>
            </div>
            <input type="submit" class="btn btn-primary" name="encrypt" value="Encrypt">
        </form>

        <form method="post" action="">
            <div class="form-group">
                <label for="key">Enter Key:</label>
                <input type="text" class="form-control" name="key" required>
            </div>
            <input type="submit" class="btn btn-primary" value="Show Text">
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
