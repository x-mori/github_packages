require 'minitest/autorun'
require 'x_mori/package_version'
class PackageTest < Minitest::Test
  def test_behavior
    assert_match(/\A\d/, XMori::PackageVersion.of("minitest"))
  end
end
