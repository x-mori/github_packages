require 'rubygems'
module XMori
  # Looks up the installed version of a Ruby gem.
  module PackageVersion
    module_function
    # Returns the version of an installed gem as text.
    # @param name [String] exact gem name.
    # @return [String] installed gem version.
    # @raise [ArgumentError] if the name is empty.
    # @raise [Gem::LoadError] if the gem is not installed.
    def of(name)
      raise ArgumentError, 'gem name is required' if name.nil? || name.empty?
      Gem::Specification.find_by_name(name).version.to_s
    end
  end
end
