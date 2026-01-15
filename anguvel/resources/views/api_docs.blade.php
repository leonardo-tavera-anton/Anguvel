<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-g">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Anguvel API</title>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <style>
        body {
            font-family: 'Figtree', sans-serif;
            background-color: #f3f4f6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        h1 {
            color: #1f2937;
            font-size: 2.25rem;
        }
        .endpoint-card {
            background-color: #fff;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        .endpoint-path {
            font-size: 1.125rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
        }
        .endpoint-methods {
            display: flex;
            gap: 0.5rem;
        }
        .method {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        .method-get { background-color: #dbeafe; color: #1e40af; }
        .method-post { background-color: #dcfce7; color: #166534; }
        .method-put { background-color: #fef3c7; color: #92400e; }
        .method-delete { background-color: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Anguvel API</h1>
        <p>This is a basic interface to visualize the available API endpoints.</p>

        @foreach ($routes as $route)
            <div class="endpoint-card">
                <div class="endpoint-path">{{ $route['uri'] }}</div>
                <div class="endpoint-methods">
                    @foreach ($route['methods'] as $method)
                        @if (in_array($method, ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE']))
                            <span class="method method-{{ strtolower($method) }}">{{ $method }}</span>
                        @endif
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
</body>
</html>
