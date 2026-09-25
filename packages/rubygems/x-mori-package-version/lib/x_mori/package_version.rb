require 'rubygems'
module XMori
  module PackageVersion
    module_function
    def of(name)
      raise ArgumentError, 'gem name is required' if name.nil? || name.empty?
      Gem::Specification.find_by_name(name).version.to_s
    end
  end
end
