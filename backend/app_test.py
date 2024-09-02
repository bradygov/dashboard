import unittest
from app import app

class WeatherAppTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_weather_endpoint(self):
        response = self.app.get('/weather?city=London')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()