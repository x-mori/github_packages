module XMori
  # Copies text through the operating system clipboard command.
  module CopyToClipboardCli
    module_function
    # Tries the available clipboard command for the current platform.
    # On Linux it tries wl-copy, xclip, then xsel; on macOS pbcopy; on Windows clip.
    # @param text [String] text to copy.
    # @return [Boolean] true after a clipboard command succeeds.
    # @raise [RuntimeError] if no available command succeeds.
    def copy(text)
      candidates = case RUBY_PLATFORM
                   when /darwin/ then [['pbcopy']]
                   when /mswin|mingw|cygwin/ then [['clip']]
                   else [['wl-copy'], ['xclip', '-selection', 'clipboard'], ['xsel', '--clipboard', '--input']]
                   end
      candidates.each do |command|
        begin
          IO.popen(command, 'w') { |pipe| pipe.write(text) }
          return true if $?.success?
        rescue Errno::ENOENT
          next
        end
      end
      raise RuntimeError, 'no working clipboard command found'
    end
  end
end
