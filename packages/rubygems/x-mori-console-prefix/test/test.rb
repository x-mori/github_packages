require 'minitest/autorun'
require 'x_mori/console_prefix'
class PackageTest < Minitest::Test
  def test_behavior
    require "stringio"; io = StringIO.new; XMori::ConsolePrefix.new("app", io: io, clock: -> { Time.utc(2026) }).log("ok"); assert_match(/app.*ok/, io.string)
  end
end
