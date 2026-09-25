require 'minitest/autorun'
require 'x_mori/once_async'
class PackageTest < Minitest::Test
  def test_behavior
    calls = 0; once = XMori::OnceAsync.new { calls += 1; 7 }; assert_equal 7, once.call; assert_equal 7, once.call; assert_equal 1, calls
  end
end
