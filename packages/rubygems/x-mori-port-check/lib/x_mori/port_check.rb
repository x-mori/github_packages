require 'socket'
module XMori
  # Checks whether a local TCP port can be bound.
  module PortCheck
    module_function
    # Tries to bind a TCP listener, then closes it immediately.
    # @param port [Integer] port from 0 through 65535; 0 requests any available port.
    # @param host [String] local interface to bind.
    # @return [Boolean] false if the port is already in use or access is denied.
    # @raise [ArgumentError] if the port is outside the valid range.
    # @note Availability can change immediately after this method returns.
    def available?(port, host: '127.0.0.1')
      raise ArgumentError, 'port must be 0..65535' unless port.is_a?(Integer) && port.between?(0, 65_535)
      server = TCPServer.new(host, port)
      server.close
      true
    rescue Errno::EADDRINUSE, Errno::EACCES
      false
    end

    # Finds the first bindable TCP port in a bounded range.
    # @param start [Integer] first port to test, from 1 through 65535.
    # @param host [String] local interface to bind.
    # @param limit [Integer] positive maximum number of ports to try.
    # @return [Integer, nil] first available port, or nil when none is found.
    # @raise [ArgumentError] if the start or limit is invalid.
    def next_free(start, host: '127.0.0.1', limit: 100)
      raise ArgumentError, 'invalid port range' unless start.is_a?(Integer) && start.between?(1, 65_535) && limit.is_a?(Integer) && limit.positive?
      (start..[start + limit - 1, 65_535].min).find { |port| available?(port, host: host) }
    end
  end
end
