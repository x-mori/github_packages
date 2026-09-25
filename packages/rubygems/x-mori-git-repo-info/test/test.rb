require 'minitest/autorun'
require 'x_mori/git_repo_info'
class PackageTest < Minitest::Test
  def test_behavior
    assert_equal({ owner: "x-mori", repo: "minimori-packages" }, XMori::GitRepoInfo.parse("git@github.com:x-mori/minimori-packages.git"))
  end
end
