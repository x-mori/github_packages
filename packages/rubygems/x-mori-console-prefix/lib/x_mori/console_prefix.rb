require 'time'
module XMori
  # Writes timestamped, namespaced messages to an output stream.
  class ConsolePrefix
    # Configures the label, destination, and timestamp source.
    # @param namespace [String] label included with each message.
    # @param io [IO] writable output stream; defaults to standard output.
    # @param clock [Proc] callable returning a Time for the timestamp.
    def initialize(namespace, io: $stdout, clock: -> { Time.now.utc })
      @namespace, @io, @clock = namespace, io, clock
      @mutex = Mutex.new
    end

    # Writes one complete line while holding a mutex.
    # @param message [Object] value to append after the timestamp and namespace.
    # @return [String] the written line without a trailing newline.
    def log(message)
      line = "[#{@clock.call.iso8601}] [#{@namespace}] #{message}"
      @mutex.synchronize { @io.puts(line) }
      line
    end
  end
end
