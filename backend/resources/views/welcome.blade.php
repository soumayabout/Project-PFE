<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PFE Management System</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Styles -->
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }

        .container {
            max-width: 1100px;
            margin: auto;
            padding: 2rem;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .card {
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem;
            text-decoration: none;
            transition: transform 0.3s ease;
            width: 100%;
        }
        .flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
}


        .card:hover {
            transform: scale(1.05);
        }

        .card__icon {
            background-color: #f0f0f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3.5rem;
            width: 3.5rem;
            margin-bottom: 1.5rem;
        }

        .card__title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .card__description {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        footer {
            background-color: #333;
            color: #fff;
            padding: 2rem;
            text-align: center;
            margin-top: 2rem;
        }

        footer a {
            color: #fff;
            text-decoration: none;
            margin: 0 0.5rem;
            transition: color 0.3s ease;
        }

        footer a:hover {
            color: #ccc;
        }

        @media (min-width: 768px) {
            .container {
                padding: 4rem;
            }

            .card {
                width: calc(33.333% - 1rem);
                margin-right: 1rem;
            }

            .card:last-child {
                margin-right: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>PFE Management System</h1>
        <div class="cards">
            <a href="#" class="card" aria-label="View PFE List">
                <div class="card__icon">
                    <!-- Replace with your desired icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3" y2="6"></line>
                        <line x1="3" y1="12" x2="3" y2="12"></line>
                        <line x1="3" y1="18" x2="3" y2="18"></line>
                    </svg>
                </div>
                <div class="card__content">
                <div class="card__title">View PFE List</div>
                <div class="card__description">Browse the list of available PFE topics and select the ones you're interested in.</div>
            </a>
            <a href="#" class="card" aria-label="PFE Registration">
                <div class="card__icon">
                    <!-- Replace with your desired icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                </div>
                <div class="card__title">PFE Registration</div>
                <div class="card__description">Register for a PFE topic and submit your application.</div>
            </a>
            <!-- Add more cards as needed -->
        </div>
    </div>
    <footer>
        <p>&copy; 2023 PFE Management System. All rights reserved.</p>
        <div>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
        </div>
    </footer>
</body>
</html>
