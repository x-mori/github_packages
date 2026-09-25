require 'minitest/autorun'
require 'x_mori/port_check'
class PackageTest < Minitest::Test
  def test_behavior
    assert XMori::PortCheck.available?(0); assert XMori::PortCheck.next_free(40_000).is_a?(Integer)
  end
end
