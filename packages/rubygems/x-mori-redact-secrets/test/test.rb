require 'minitest/autorun'
require 'x_mori/redact_secrets'
class PackageTest < Minitest::Test
  def test_behavior
    assert_equal "[REDACTED]", XMori::RedactSecrets.call({"api_key" => "abc"})["api_key"]; assert_equal "Bearer [REDACTED]", XMori::RedactSecrets.call("Bearer abc")
  end
end
